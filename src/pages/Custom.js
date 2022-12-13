import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from './Constants.json'
import jwt_decode from "jwt-decode"
import Modal from "./components/CustomizerModal";
import { Link } from 'react-router-dom';


export default function Custom(props) {
  const [showModal, setShowModal] = useState(false);
  const [customViewsArray, setCustomViewsArray] = useState([])
  const [userId, setUserId] = useState("View Title")

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }

  useEffect(() => {
    const decodedToken = jwt_decode(props.token);
    let quickUserId = decodedToken.user.id.S;
    setUserId(quickUserId)
    axios.get(Constants.API_ADDRESS + '/custom-views?id=' + quickUserId, {
    }).then((response) => {
      setCustomViewsArray(response.data)
    })
  }, [])

  function handleDelete(id) {
    // delete from customViewsArray the item with viewId === id

    customViewsArray.splice(customViewsArray.findIndex(item => item.viewId === id), 1)
    axios.post(Constants.API_ADDRESS + '/custom-views', {
      id: userId,
      json: JSON.stringify(customViewsArray)
    }).then(() => {
      window.location.reload(false);
    })

  }

  return (
    <div className="custom-container">
      <h1 className="title">My custom views</h1>
      <button onClick={toggleModal}>Create custom view</button>
      <Modal showModal={showModal} setShowModal={setShowModal} userId={userId} customViewsArray={customViewsArray} />
      <div className="customViews">
        {customViewsArray.map((item) => {
          var true_views = 0;
          //loop through  item.views and add up the true values
          for (var key in item.views) {
            if (item.views[key] === true) {
              true_views++;
            }
          }
          return (
            <div className="customView">
              <h4>{item.viewName}</h4>
              <p>{true_views} views</p>
              <p>{item.viewDescription}</p>
              <div className="customViewButtons">
                <button>
                  <Link to={`/your-view/:${item.viewId}`} state={item} className="nav-link">
                    View
                  </Link>
                </button>
                <button onClick={() => { handleDelete(item.viewId) }}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}
