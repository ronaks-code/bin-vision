import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../Firebase';

const useFetchBinsData = (sortKey = 'itemsRecycled') => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(db, 'Data');
    const successCallback = (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        const formattedData = Object.values(firebaseData).filter(Boolean).map(item => ({
          location: item.Location,
          binNumber: item['Bin Number'],
          itemsRecycled: item['Items Recycled'],
          itemsTrashed: item['Items Trashed'],
          itemsComposted: item['Items Composted'],
          latitude: item.Latitude,
          longitude: item.Longitude
        }));

        const sortedData = formattedData.sort((a, b) => b[sortKey] - a[sortKey]);
        setData(sortedData);
      } else {
        console.error('No data retrieved from Firebase.');
      }
    };

    onValue(dataRef, successCallback);

    return () => off(dataRef, 'value', successCallback);
  }, [sortKey]);

  return data;
};

export default useFetchBinsData;