import React, { useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap';


const Resources = ({ getresources }) => {

    const sampleData = {
        IVreports1: {
            20221: "http://localhost:3000/admin/resources",
            20231: "http://localhost:3000/admin/resources",
        },
        IVreports2: {
            20222: "https",
            20232: "https",
            20242: {
                1: "https",
                2: 'https',
            }
        }
    }

    // const LinkModal = () => (
    //     <Modal backdrop='static' show={loading} onShow={onshowModalListener} onHide={handleClose}>
    //         <Modal.Body className='p-0'>
    //             <LoadSpinner sucessMsg={sucessMsg} />
    //         </Modal.Body>
    //     </Modal>
    // )
    // const FolderModal = () => (
    //     <Modal backdrop='static' show={loading} onShow={onshowModalListener} onHide={handleClose}>
    //         <Modal.Body className='p-0'>
    //             <Form.Control type='text' />
    //             <Button type='button'>Submit</Button>
    //         </Modal.Body>
    //     </Modal>
    // )

    const [resourcesData, setResourcesData] = useState(getresources || sampleData)

    function SetHtml({ _resourcesData }) {
        const parentAdd = []
        Object.keys(_resourcesData).forEach((item) => {
            if (typeof _resourcesData[item] == 'object') {
                parentAdd.push(<AccordionParent refer={_resourcesData[item]} key={item} title={item} childrenComp={<SetHtml _resourcesData={_resourcesData[item]} />} />)
            }
            else {
                parentAdd.push(<AccordionButton key={item} title={item} link={_resourcesData[item]} />)
            }
        })
        return parentAdd
    }

    function addtitle(refer) {
        refer['new'] = { new: "knew" }
        setResourcesData(temp => ({...resourcesData}))
    }

    const AccordionParent = ({ title, childrenComp, refer }) => {
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{title} <Button variant='danger' onClick={() => addtitle(refer)} type='button'>add</Button></Accordion.Header>
                    <Accordion.Body >
                        {childrenComp}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }
    const AccordionButton = ({ title, link }) => (
        <div>
            <a href={link}><Button>{title}</Button></a>
        </div>
    )
    // var accordionExample = <div className="accordion" id="accordionExample">
    //     <div className="accordion-item">
    //         <h2 className="accordion-header" id="headingOne">
    //             <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
    //                 Accordion Item #1
    //             </button>
    //         </h2>
    //         <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    //             <div className="accordion-body">
    //                 <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    //             </div>
    //         </div>
    //     </div>
    // </div>
    return (
        <>
            <AccordionParent title={`resources`} refer={resourcesData} childrenComp={<SetHtml _resourcesData={resourcesData} />} />
            {/* <SetHtml _resourcesData={resourcesData} /> */}
        </>
    )
}

export default Resources