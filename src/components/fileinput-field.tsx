import { ChangeEventHandler, useState } from "react";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInputField = ({ onChange }: Props) => {
  return (
    <div className="flex justify-center m-4">
      <form className="flex items-center space-x-6">
        <label className="block">
          <span className="text-sm">ここに牌譜データをアップロードしてください。</span>
          <input
            type="file"
            /* @ts-expect-error */
            directory=""
            webkitdirectory=""
            onChange={onChange}
            className="block w-full text-sm text-slate-500
          border
          file:mr-4 file:py-2 file:px-4
          file:border-0 rounded-md
          file:text-sm file:font-semibold
          file:bg-gray-50 file:text-gray-700
          hover:file:bg-gray-100
        "
          />
        </label>
      </form>
    </div>
  );
};

export default FileInputField;
