import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Link } from "react-router-dom";
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.position}</td>
   <td>{props.record.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function RecordList() {
 const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
 useEffect(() => {
      axios.get('http://localhost:5050/record').then(response => {
        console.log(response)
      setRecords(response.data.records);
     }).catch(error => {
      console.error(error);
     });
 }, []);
  // This method will delete a record
 async function deleteRecord(id) {
  console.log(id)
   await fetch(`http://localhost:5050/${id}`, {
     method: "DELETE"
   }).then(response => {
    console.log(response);
    console.log(records)
    if(response.status == 200){
      const newRecords = records.filter((el) => el._id !== response.id);
      setRecords(newRecords);
    }
   }).catch(error => {
      window.alert(error)
   })

 }
  // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}