import React, { useEffect, useState } from 'react'
import Listingtable from '../../components/Listingtable'
import styles from '../../styles/All.module.css'

const All = () => {
  const [rowDate, setRowdata] = useState([]);

  function createData(address, price, description, rentalStatus, action) {
    return {
      address,
      price,
      description,
      rentalStatus,
      action,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://18.222.121.41:3002/api/real-estate/');
      const json = await data.json();
      setRowdata(json);
    }

    fetchData().catch(console.error);

  }, [])


  // const rowData = [
  //   createData('4323 Rosewood Court', 3050, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('3146 Melville Street', 4520, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('1870 Cinnamon Lane', 2620, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('760 McDonald Avenue', 1590, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('2999 Glendale Avenue', 3560, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('2322 Lunetta Street', 4080, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('552 Science Center Drive', 2370, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('389 Upton Avenue', 3750, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('1424 August Lane', 5180, 26.0, "Inactive", "Update"),
  //   createData('2567 Corbin Branch Road', 3920, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('4553 Middleville Road', 3180, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('4936 Augusta Park', 3600, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  //   createData('3042 Parkview Drive', 4370, "1Bed1Bathroom and no pet, no smoke", "Active", "Update"),
  // ];


  return (
    <>
      <div className={styles.datagrid}>
        <Listingtable rowData={rowDate} setRowdata={setRowdata} />
      </div>
    </>
  )
}

export default All