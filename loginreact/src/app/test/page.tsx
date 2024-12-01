"use client";

import Modal from "@/components/utils/Modal";
import { useState } from "react";

const SomeComponent = () => {
  const [isViewable, setIsViewable] = useState(false);

  return (
    <>
      <button onClick={() => setIsViewable(true)}>モーダルを開く</button>
      {isViewable && (
        <Modal closeModal={() => setIsViewable(false)}>
          <p>再利用可能なモーダルの中身</p>
        </Modal>
      )}
    </>
  );
};

export default SomeComponent;
