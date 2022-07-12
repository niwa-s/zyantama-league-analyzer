// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from "fs";
import * as path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string[];
};
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const paifuDir = path.join(process.cwd(), "siniki-paifu");
  let data: string[] = [];
  fs.readdir(paifuDir, (err, files) => {
    //res.status(200).json({ data: files })
    files.forEach((file) => {
      data.push(fs.readFileSync(path.join(paifuDir, file), { encoding: "utf-8" }));
    });
    res.status(200).json({ data });
  });
}

/*
var fs = require('fs');
fs.readdir('.', function(err, files){
    if (err) throw err;
    var fileList = files.filter(function(file){
        return fs.statSync(file).isFile() && /.*\.csv$/.test(file); //絞り込み
    })
    console.log(fileList);
});
*/
