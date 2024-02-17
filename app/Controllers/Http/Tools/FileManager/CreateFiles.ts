import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import sharp from "sharp";
type FileType = ReturnType<HttpContextContract["request"]["file"]>;
type OptionsType = {
  maxSize?: number;
  min?: number;
  max?: number;
  extname?: string[];
  throwError?: boolean;
};
export async function createFiles({
  request, 
  table_id,
  table_name,
  column_name,
  options,
}: {
  request: HttpContextContract["request"];
  table_id: string;
  table_name: string;
  column_name: string;
  options?: OptionsType;
}): Promise<string[]> {
  let count = 0;
  const promises: Promise<any>[] = [];
  const filesList: FileType[] = [];
  const { extname, max, maxSize, min, throwError } = options || {};
  while (true) {
    const file = request.file(`${column_name}_${count++}`);
    if (!file) {
      break;
    }
    filesList.push(file);
  }
  if (min && filesList.length < min) {
    if (throwError) throw new Error("number of Files must be >= " + min);
    else return [];
  }
  if (max && filesList.length > max) {
    if (throwError) throw new Error("number of Files must be <= " + min);
    else return [];
  }

  filesList.forEach((file, i) => {
    if (!file) return;
    if (extname && !extname.includes(file.extname || "")) {
      if (throwError) throw new Error("File bad Extension : " + file?.extname);
      else return;
    }
    if (maxSize && file.size > maxSize) {
      if (throwError)
        throw new Error("File  size must be < " + file.size + " byte");
      else return;
    }
    promises.push(
      moveFile({
        column_name,
        count: i,
        file,
        table_id,
        table_name,
      })
    );
  });
  
  return (await Promise.allSettled(promises))
    .filter((f) => f.status == "fulfilled")
    .map((m) => (m as any).value); //urls
}

export function moveFile({
  column_name,
  file,
  table_id,
  table_name,
  count,
}: {
  file: FileType;
  table_id: string;
  table_name: string;
  column_name: string;
  count: number;
}) {
  if (!file) return Promise.reject(null);
  return new Promise(async (rev, rej) => {
    
     try {
      const fileName = `${Date.now().toString(32)}_${Math.round(
        Math.random() * 10e6
      ).toString(36)}${count}_${table_name}_${column_name}_${table_id}.webp`;
     const stat = await sharp(file.tmpPath).metadata();
     let iw = 0;
     let ih = 0;
     let lw = 281;
     let lh = 157;
     let a = 1;
     const c = 1280;
     if(stat.height && stat.width){
      a = stat.width/stat.height
      if(a>1){
        iw = c;
        ih = c / a;
      }else{
        ih = c;
        iw = a * c
      }
     }
     iw = Math.trunc(iw);
     ih = Math.trunc(ih);
     console.log({ih,iw, lh,lw});
     
      sharp(file.tmpPath)
      .resize(iw?{
        width:iw,
        height:ih
      }:c)
        .webp({quality: 80})
        .composite([
          {
            input: "./logo_joumiadeals2.png",
            top: ih - lh,
            left: iw - lw,
          },
        ])
        .toFile(`${Env.get("FILE_STORAGE")}/${fileName}`);
        rev(fileName);
    } catch (error) {
      rej(null);
    }
  });
}
