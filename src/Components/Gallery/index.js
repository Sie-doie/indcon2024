import React, { useEffect, useState } from 'react'
import { images_url } from '../../assests/DataBase'
import HeadingComp from '../Others/HeadingComp'
import { Carousel, Modal } from 'react-bootstrap'
import LoadSpinner from '../Loading/LoadSpinner'

const Gallery = () => {
  const numImages = 14
  const [loading, setloading] = useState(false);
  const [galleryShow, setGalleryShow] = useState(false)
  const [imgModal, setImgModal] = useState([])
  const [listImg, setListImg] = useState({})

  useEffect(() => {
    setImgs();
  }, [])


  const showImage = (num) => {
    const temp = []
    for (let index = -1; index < numImages - 1; index++) {
      temp.push((num + index) % (numImages) + 1)
    }
    setImgModal(temp)
    setGalleryShow(num)
  }

  async function setImgs() {
    let result = {};
    const url =
      "https://corsproxy.io/?" +
      encodeURIComponent(
        `https://drive.google.com/embeddedfolderview?id=${'13l6V9J2k4PdV6FNwjrpvSUZOEa5LCSPJ'}#list`,
      );
    const html = await fetch(url).then((resp) => resp.text());
    const parent = document.createElement("div");
    parent.innerHTML = html;
    const folders = Array.from(parent.querySelectorAll(".flip-entry"));
    folders.forEach(async (item, index) => {
      // const src = item.querySelector("a").getAttribute("href");
      // const img = item.querySelector("img");
      const gid = item.getAttribute("id").replace("entry-", "");
      const name = item.querySelector(".flip-entry-title").innerHTML;
      result[name] = []
      const innerurl =
        "https://corsproxy.io/?" +
        encodeURIComponent(
          `https://drive.google.com/embeddedfolderview?id=${gid}#list`,
        );
      await fetch(innerurl).then(resp => resp.text()).then(innerhtml => {
        const child = document.createElement("div");
        child.innerHTML = innerhtml;
        if (child.querySelector(".flip-entry-list-icon img")) {
          if (child.querySelector(".flip-entry-list-icon img").getAttribute("src").includes("type/image/jpeg")) { child.querySelectorAll(".flip-entry").forEach(item1 => result[name].push(item1.getAttribute("id").replace("entry-", ""))); }
        }
        return;
      }
      )
      if (!result[name].length) { delete result[name] }

      setListImg(result)
      setloading(true)
    })
    console.log(result)
  }

  return (
    <>
      {loading ? <div className="pb-5" data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" data-aos-duration="500">
        {/* <Modal size='xl' show={galleryShow} onHide={() => setGalleryShow(false)}>
        <Modal.Header onClick={() => setGalleryShow(false)}>X</Modal.Header>
        <Modal.Body>
          <Carousel data-aos="fade-up" data-aos-offset="100" data-aos-delay="200" data-aos-duration="500">
            {imgModal.map((item, index) => {
              return (
                <Carousel.Item style={{ backgroundColor: 'black' }} key={`slide${item + 1}`}>
                  <img
                    style={{ filter: 'opacity(0.7)', width: '50vw' }}
                    className="d-block w-100"
                    src={images_url + `gallery indcon/1 (${item}).jpeg`}
                    alt="First slide"
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Modal.Body>
      </Modal> */}
        <HeadingComp head={'Gallery'} />
        <div className="row justify-content-center ms-1 me-1">
          <p>head</p>
          {
            // console.log(listImg)
            Object.keys(listImg).map(function(event) {
              const result = <p> <span>{event}</span> {listImg[event].map(imgID => (<p>{imgID}</p>))}</p>;
              return result
              
            }
            )
          }
          {/* {[...Array(numImages).keys()].map((item, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mt-2">
            <img
              onClick={() => showImage(item + 1)}
              style={{ width: '100%' }}
              className="d-block w-100"
              src={images_url + `gallery indcon/1 (${item + 1}).jpeg`}
              alt="First slide"
            />
          </div>
        ))} */}
        </div>
      </div> : <LoadSpinner />}
    </>

  )
}

export default Gallery