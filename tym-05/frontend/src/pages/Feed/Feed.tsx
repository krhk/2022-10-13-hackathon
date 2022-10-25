
import React, {useState, useEffect} from "react";
import FeedBox from "../../components/FeedBox/FeedBox";
import styles from "./Feed.module.css";
import "./Feed.module.css";

const Feed = () => {

    const [feed, setFeed] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/feed").then((res) => {
            res.json().then((json) => {
                setFeed(json)
            })
        })
    }, [])

    return (
        <div className={styles.container}>
            {feed.map((obj) => {
                console.log(obj)
                return (
                    <FeedBox id={obj.id} img={obj.base64_image} description={obj.description} downvotes={obj.number_of_downvotes} upvotes={obj.number_of_upvotes} />
                )
            })}
        </div>)

}

export default Feed;
