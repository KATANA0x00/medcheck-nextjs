'use client';
import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [medIdRef, setMedIdRef] = useState('-');
  const [medNameRef, setMedNameRef] = useState('-');
  const [medId, setMedId] = useState('-');
  const [medName, setMedName] = useState('-');
  let myTimer;

  function scanRef() {
    document.getElementById('med-input-ref').focus();
  }

  function scan() {
    document.getElementById('med-input').focus();
  }

  async function callname(inputValue) {
    try {
      const response = await axios.get('/api/callname', {
        params:{
          inputValue: inputValue
        }
      });
      if(response.data.result.rows.length > 0){
        const MedName = response.data.result.rows[0].medname;
        return MedName;
      }
      else {
        return 'unknown';
      }
    } catch (error) {
      console.error('Error fetching medicine name:', error);
      return 'unknown';
    }
  }

  return (
    <div>
      <div className="container">
        <h1>Target Medicine</h1>
        <div className="med-info">
          <h2 className="med-title">Name :</h2>
          <h2 id="med-name-ref">{medNameRef}</h2>
          <h2 className="med-title">ID :</h2>
          <h2 id="med-id-ref">{medIdRef}</h2>
        </div>
        <div className="footer">
          <button className="scan-btn" onClick={scanRef}>
            Target Medicine
          </button>
          <input
            type="text"
            id="med-input-ref"
            autoComplete="off"
            inputMode="none"
            onInput={(e) => {
              clearTimeout(myTimer);
              myTimer = setTimeout(() => {
                setMedIdRef(e.target.value);
                setMedNameRef(callname(e.target.value));
                e.target.value = '';
                scan();
              }, 500);
            }}
            onFocus={(e) => {
              document.getElementsByClassName('container')[0].style.border = 'solid #ABD9E9 5px';
              document.getElementsByClassName('container')[1].style.border = 'solid transparent 5px';
            }}
          />
        </div>
      </div>

      <div className="container">
        <h1>Scanned Medicine</h1>
        <div className="med-info">
          <h2 className="med-title">Name :</h2>
          <h2 id="med-name">{medName}</h2>
          <h2 className="med-title">ID :</h2>
          <h2 id="med-id">{medId}</h2>
        </div>
        <div className="footer">
          <button className="scan-btn" onClick={scan}>
            Scanned Medicine
          </button>
          <input
            type="text"
            id="med-input"
            autoComplete="off"
            inputMode="none"
            onInput={(e) => {
              clearTimeout(myTimer);
              myTimer = setTimeout(() => {
                setMedId(e.target.value);
                setMedName(callname(e.target.value));
                e.target.value = '';
                scan();
              }, 500);
            }}
            onFocus={(e) => {
              document.getElementsByClassName('container')[0].style.border = 'solid transparent 5px';
              document.getElementsByClassName('container')[1].style.border = 'solid #ABD9E9 5px';
            }}
          />
        </div>
      </div>
      
      <div className="status-container">
        <h1>STATUS : </h1>
        <h1
          style={{ color: medIdRef === '-' && medId === '-' ? 'black' : (medIdRef === medId ? 'green' : 'red') }}
        >
          {medIdRef === '-' && medId === '-' ? 'Waiting...' : (medIdRef === medId ? 'Match!!' : 'NOT Match!!')}
        </h1>
      </div>

    </div>
  );
}

export default Home;