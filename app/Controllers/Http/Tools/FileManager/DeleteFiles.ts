import Env from "@ioc:Adonis/Core/Env";
import fs from "fs";


export async function deleteFiles(id: string,fieldName?:string): Promise<number> {
    let deletedFileCounter = 0;
    
  fs.readdir(Env.get("FILE_STORAGE"), (_, files) => {
    files?.forEach(fileName => {
      const selector = fieldName ? `${fieldName}_${id}`:id;
     if(fileName.includes(selector)){
      fs.unlink(`${Env.get("FILE_STORAGE")}/${fileName}`, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
       console.log(deletedFileCounter++,fileName);
     }
    });
  });
  
    return deletedFileCounter;
  }