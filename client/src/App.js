import {useForm} from "react-hook-form";
import TableComponent from './TableComponent.js';
import {useEffect, useState} from "react";

function App() {
  const {  register, handleSubmit } = useForm()
  const [csvLoaded, setCsvLoaded] = useState(false);
  const [details, setDetails] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    if (data.file[0]){
      const details = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
          mode: 'no-cors'
      }).then(
        setTimeout(() => {
          setCsvLoaded(true)
        }, 100))
    }
  }

  useEffect(()=>{
    async function getDetails(){

      const details = await fetch("http://localhost:8080",  { 
        method: 'get',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            },
            'credentials': 'same-origin'
          })
      const resp = await details.json()
      setDetails(resp);
    }

    if (csvLoaded){
      getDetails()
    }
  }, [csvLoaded])

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
      <label className="input-field-label">
      <input type="file" name="file" className='input-field' {...register("file")}/>
</label>
        <button type="submit" className='upload-btn'>Upload</button>
      </form>
      <TableComponent details={details} />
    </div>
  );
}

export default App;
