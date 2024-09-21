import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreatePost() {
  return (
    <div className="p-3 flex flex-col max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post!</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4  justify-between">
          <TextInput type="text" placeholder="Title" required id="title" className="flex-1"/>
          <Select>
            <option value="uncategorized">Select Category</option>
            <option value="Javascript">JS</option>
            <option value="React">React</option>
            <option value="Mongo DB">Database</option>
            <option value="Express js">Express js</option>
          </Select>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type="file"></FileInput>
            <Button type="button" gradientDuoTone={"purpleToBlue"} size="sm" outline>Upload Image</Button>
          </div>
          <ReactQuill theme="snow" required placeholder="Write the blog here!" className="h-72 mb-12"></ReactQuill>
          <Button type="submit" gradientDuoTone={"purpleToPink"}>Publish</Button>
        </div>
      </form>
    </div>
  )
}
