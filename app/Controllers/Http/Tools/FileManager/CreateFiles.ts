import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
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
      await file.move(Env.get("FILE_STORAGE"), {
        name: `${Date.now().toString(32)}_${Math.round(
          Math.random() * 10e6
        ).toString(36)}${count}_${table_name}_${column_name}_${table_id}.${
          file.extname
        }`,
        overwrite: true, // overwrite in case of conflict
      });
      rev(file.fileName);
    } catch (error) {
      rej(null);
    }
  });
}
