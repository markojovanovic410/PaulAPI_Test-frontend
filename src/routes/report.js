import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../states/cookie";

const Report = () => {
  const navigate = useNavigate();
  const { cookie } = useCookie();
  const [numberValue, setNumberValue] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageBase64, setImageBase64] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    if (cookie == null) {
      navigate("/signin");
    } else handleSession();
  }, []);

  const handleSession = (e) => {
    axios
      .post(`${process.env.REACT_APP_TEST_API}session`, { cookie: cookie })
      .then((response) => {
        if (response.data.success) {
          setIsLogin(true);
        } else navigate("/signin");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      let file = e.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        let src = e.target.result.split(",")[1];
        setImageBase64(src);
      };
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();

    const filename = image.raw.name;
    const jpgFILE = {
      name: filename,
      size: image.raw.size,
      type: image.raw.type,
      data: imageBase64,
    };

    let formData = {
      number_value: numberValue,
      jpgFILE: jpgFILE,
    };

    await axios
      .post(`${process.env.REACT_APP_TEST_API}report`, {
        cookie: cookie,
        reportData: formData,
      })
      .then((response) => {
        let data = response.data.message;
        console.log(data);
        if (response.data.success) {
          // let tempHtml = data.report_html.replace('/portal',"https://paul.blueboxonline.com/portal");
          contentRef.current.innerHTML = data.report_html;
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const inputChangeHandler = (setFunction, e) => {
    setFunction(e.target.value);
  };

  return (
    <div className="page-body">
      {isLogin && (
        <>
          <h1 className="page-title">Report</h1>
          <div
            className="d-flex justify-content-center align-items-center"
          >
            <Form onSubmit={handleReport}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter a value between 1 and 10</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="number"
                  onChange={(e) => inputChangeHandler(setNumberValue, e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Attach a JPG image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Generate Report
                </Button>
              </div>
            </Form>
          </div>
          <div ref={contentRef} className="report-detail"></div>
        </>
      )}
    </div>
  );
};

export default Report;
