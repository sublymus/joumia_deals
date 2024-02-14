import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import fs from "fs";

export async function createFiles(
  files: ReturnType<HttpContextContract["request"]["files"]>,
  id: string
): Promise<string[]> {
  let urls: string[] = [];
  if (files?.length > 0) {
    let i = 0;
    const random = Math.round(Math.random() * 10e6);

    const a = files.map((file) => {
      return new Promise(async (rev, rej) => {
        try {
          await file.move("./ert", {
            name: `${Date.now().toString(32)}_${random.toString(36)}${i++}_${
              file.fieldName
            }_${id}.${file.extname}`,
            overwrite: true, // overwrite in case of conflict
          });
          rev(file.fileName);
        } catch (error) {
          rej(null);
        }
      });
    });

    urls = (await Promise.allSettled(a))
      .filter((f) => f.status == "fulfilled")
      .map((m) => (m as any).value);
  }
  return urls;
}

export async function deleteFiles(id: string): Promise<number> {
  let deletedFileCounter = 0;
  console.log(id);

  return deletedFileCounter;
}

export async function updateFiles({
  files,
  lastUrls,
  newPseudoUrls,
  tableId,
}: {
  lastUrls: string;
  newPseudoUrls: string | undefined;
  files: ReturnType<HttpContextContract["request"]["files"]>;
  filesAttribute: string;
  tableId: string;
}): Promise<string[]> {
  let _newPseudoUrls: string[] = [];
  let _lastUrls: string[] = [];
  let newUrls: string[] = [];
  try {
    _lastUrls = JSON.parse(lastUrls);
    if (!Array.isArray(_lastUrls)) _lastUrls = [];
    if (newPseudoUrls) _newPseudoUrls = JSON.parse(newPseudoUrls);
    if (!Array.isArray(_newPseudoUrls)) _newPseudoUrls = [];
  } catch (error) {}
  const pointer = files + ".";
  if (_newPseudoUrls) {
    let i = 0;
    const random = Math.round(Math.random() * 10e6);
    const promisesAdd = _newPseudoUrls.map((pseudoUrl) => {
      return new Promise(async (rev, rej) => {
        if (pseudoUrl.startsWith(pointer)) {
          const index = parseInt(pseudoUrl.replace(pointer, ""));
          const file = files[index];
          try {
            await file.move(Env.get("FILE_STORAGE"), {
              name: `${Date.now().toString(32)}_${random.toString(36)}${i++}_${
                file.fieldName
              }_${tableId}.${file.extname}`,
              overwrite: true, // overwrite in case of conflict
            });
            return rev(file.fileName);
          } catch (error) {
            return rej(null);
          }
        } else {
          const filePath = `${Env.get("FILE_STORAGE")}/${pseudoUrl}`;
          fs.stat(filePath, function (err, stats) {
            console.log(filePath, stats); //here we got all information of file in stats variable
            if (err) {
              return rej(null);
            }
            rev(pseudoUrl);
          });
        }
      });
    });

    newUrls = (await Promise.allSettled(promisesAdd))
      .filter((f) => f.status == "fulfilled")
      .map((m) => (m as any).value);
  }
  console.log(_lastUrls);

  _lastUrls.map((lastUrl) => {
    if (!newUrls.includes(lastUrl)) {
      console.log("##########", lastUrl);
      const filePath = `${Env.get("FILE_STORAGE")}/${lastUrl}`;
      fs.stat(filePath, function (err) {
        if (err) {
          return console.error(err);
        }
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      });
    }
  });
  return newUrls;
}
