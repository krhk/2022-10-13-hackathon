import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/svg/arrow.svg";
import Map from "../../assets/svg/Group 3.svg";
import Image from "../../assets/svg/Group 4.svg";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [post, setPost] = useState<any>({
    description: "",
    number_of_upvotes: 0,
    number_of_downvotes: 0,
    position: {
      lat: 0,
      lng: 0,
    },
    base64_image: "",
  });

  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const navigate = useNavigate();

  const inputFile = useRef<any>(null);

  const chooseImage = () => {
    inputFile?.current?.click();
    console.log(inputFile);
  };

  function getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const addNewPost = () => {
    if (image === null || description === null) return;

    console.log(post);
    fetch("http://localhost:8080/post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    setPost({
      base64_image: image,
      description: description,
    });
  }, [image, description]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img
          src={ArrowLeft}
          alt="sipka ukazujici doleva"
          onClick={() => navigate("/feed")}
          style={{ cursor: "pointer" }}
        />
        <div className={styles.postWrapper}>
          <input
            alt="image picker"
            type="file"
            id="file"
            onChange={(e) => {
              // @ts-ignore
              getBase64(e?.target?.files[0]);
            }}
            ref={inputFile}
            style={{ display: "none" }}
          />
          {image !== null ? (
            <img src={image} alt="chosen photo" className={styles.postPhoto} />
          ) : (
            <div className={styles.postPhoto} onClick={() => chooseImage()}>
              <img src={Image} alt="vyberte obrazek" />
            </div>
          )}

          <div className={styles.postMap}>
            <img src={Map} alt="vyberte z mapy" />
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Zadejte popisek problému..."
          ></textarea>
          <div className={styles.bottomContainerButtonWrapper}>
            <button onClick={() => addNewPost()}>Přidat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
