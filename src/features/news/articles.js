import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseString } from 'xml2js';
// import 'rss-parser';
// import Parser from 'rss-parser';

const Articles = (props) => {
    const [feed, setFeed] = useState([]);
    const [refreshButton, setRefresh] =useState("refresh")

    const getFeed = async () => {

        const corsProxy = "https://cors.eu.org/";
         await fetch(corsProxy + 'https://www.wired.com/feed/rss')

                                        .then(res => res.text()
                                            .then((data) => parseString(data, parseStringCallback))
                                            .catch((err) => console.warn("data err", err))
                                            .finally(() => console.info("data complete")))
                                    
                                        .catch(err => console.warn("res err", err))
                                        .finally(() =>setRefresh("refresh"))
    }

    const parseStringCallback = (err, res) => {
        if (err) {
          console.warn("err", err);
        } else {

            let feedList = res.rss.channel[0].item;
            let entries = [];

            
            feedList.map((item) => {
            let entry = {
                "title": item.title[0],
                "description": item.description[0],
                "mediaContent": item["media:thumbnail"][0].$,
                "pubDate": item.pubDate[0],
                "link": item.link[0]
            }
           
            entries.push(entry);

          });
          
          setFeed(entries);
        }
      };

    useEffect(() => {
        getFeed();
    }, [])


    return(
        <div>
            <div className="w-75 m-4 mt-1">
                <button className="btn btn-outline-secondary" onClick={() => {
                    setRefresh("refreshing...")
                    getFeed();
                }}>{refreshButton}</button>
            </div>
            <small className='text-muted'>News count: {feed.length}</small>
            <div>
                {
                feed.map((item) => {
                    return(
                    <div className='card p-4 m-2 bg-transparent' style={{
                        "max-width": "800px"
                    }}>
                        <img src={item.mediaContent.url} className="card-img-top rounded-3" alt="..."></img>
                            <h5 className='card-title mt-3'>
                                {item.title}
                            </h5>
                            <p className='card-body'>

                            {item.description}
                            </p>
                            <p className='blockquote-footer'>{item.pubDate}</p>
                            <a target='_blank' href={item.link}>
                                Full article
                            </a>
                        </div>
                )})
            }
            </div>
            
        </div>
    )
};

export default Articles;