import React, { useEffect } from "react";
import { useState } from "react";
import { rs_gdrive } from "../../assests/DataBase";
import { Alert, Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Files from "./gdrive_scrap";
import LoadSpinner from "../Loading/LoadSpinner";
import { Link, Route, Routes, useParams } from "react-router-dom";
import HeadingComp from "../Others/HeadingComp";

const Resources = () => {

  const [loading, setloading] = useState(false);
  const [htmlRes, setHtmlRes] = useState("");
  const [title, setTitle] = useState(null)
  const { googId } = useParams();


  async function init(id) {
    setloading(false);
    let res
    const uid = window.atob(id)
    const url =
      "https://api.allorigins.win/get?url=" +
      encodeURIComponent(
        `https://drive.google.com/embeddedfolderview?id=${uid}#list`,
      );
    const html = await fetch(url).then((resp) => resp.text()).catch(err => res = <Alert style={{ width: '200px', textAlign: "center" }} variant="danger">{err.message}</Alert>);
    const parent = document.createElement("div");
    parent.innerHTML = html;
    const folders = Array.from(parent.querySelectorAll(".flip-entry"));
    if (res) { }
    else if (folders.length === 0) res = <Alert style={{ width: '250px', textAlign: "center" }} variant="warning">No item in the folder</Alert>;
    else {
      res = folders.map((item, index) => {
        const gid = item.getAttribute("id").replace("entry-", "");
        const img = item.querySelector("img");
        const src = item.querySelector("a").getAttribute("href");
        const name = item.querySelector(".flip-entry-title").innerHTML;


        return (
          <>
            <Col style={{ cursor: 'pointer' }} className="p-2" key={index} xs={6} md={4} lg={2}>
              {img !== null ? (
                <>
                  <a style={{ textDecoration: 'none', color: 'inherit' }} href={src} target="_blank" rel="noreferrer">
                    <div style={{ border: '5px solid grey' }}>
                      <div style={{ height: "200px", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                        <img src={img.src} alt={img.alt} />
                      </div>
                      <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">{name}</Tooltip>}>
                        <span style={{ whiteSpace: "nowrap", display: "inline-block", width: '100%', overflow: 'hidden', textOverflow: "ellipsis" }} className="text-center p-2">{name}</span>
                      </OverlayTrigger>
                    </div>
                  </a>

                </>
              ) : (
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/resources/${window.btoa(gid)}`}>
                  <div style={{ border: '5px solid grey' }}>
                    <img style={{ width: '100%' }} src="/folder.png" />
                    <br></br>
                    <OverlayTrigger placement={'bottom'} overlay={<Tooltip id="tooltip-disabled">{name}</Tooltip>}>
                      <span style={{ whiteSpace: "nowrap", display: "inline-block", width: '100%', overflow: 'hidden', textOverflow: "ellipsis" }} className="text-center p-2">{name}</span>
                    </OverlayTrigger>
                  </div>
                </Link>
              )}
            </Col>
          </>
        );
      });
    }

    setloading(true);
    setHtmlRes(res);
    setTitle(parent.querySelector("title").textContent);
  }

  useEffect(() => {
    init(googId || window.btoa(rs_gdrive[0].url));
  }, [googId]);


  return (
    <>
      <HeadingComp head={'SIE Resources'} />
      <div className="d-flex justify-content-center flex-wrap">
        {rs_gdrive.map((item, index) => (
          <div className="m-1" key={index}>
            <Link to={`/resources/${btoa(item.url)}`}>
              <Button
                variant={googId ? window.atob(googId) == item.url ? 'secondary' : 'outline-secondary' : rs_gdrive[0].url == item.url ? 'secondary' : 'outline-secondary'}
              >
                {item.name}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-2 ms-2 me-2">
        {loading ? (
          <>
            {title &&
              <div className="d-flex justify-content-center align-items-center">
                <h6 style={{ color: 'var(--brand-dark-col)', textDecorationLine: 'underline', fontSize: '25px' }} className="display-5 text-center p-2">{title}</h6>
                <a target="_blank" href={`https://drive.google.com/drive/folders/${window.atob(googId || window.btoa(rs_gdrive[0].url))}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>
                </a>
              </div>
            }
            <Row className="justify-content-center" >{htmlRes}</Row>
          </>
        ) : (
          <LoadSpinner />
        )}
      </div>
    </>
  );
};

export default Resources;
