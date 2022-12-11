import React, { useState } from 'react';
import Modal from "./components/CustomizerModal";


export default function Custom() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  }

  return (
    <div className="custom-container">
      <h1 className="title">My custom views</h1>
      <button onClick={toggleModal}>Show Modal</button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )

}
