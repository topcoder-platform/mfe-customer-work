import React, { useState, useEffect } from "react";
import PT from "prop-types";
import Button from "components/Button";
import { BUTTON_TYPE, BUTTON_SIZE } from "constants";
import Textarea from "components/FormElements/FormInputTextArea";
import Rating from "./Rating";
import IconClose from "../../../../../assets/images/icon-close.svg";

import "./styles.module.scss";

const FinalSurvey = ({ saveSurvey, onCancel, customerFeedback }) => {
  const [qualityOfWork, setQualityOfWork] = useState(10);
  const [results, setResults] = useState(10);
  const [recommendTopcoder, setRecommendTopcoder] = useState(10);
  const [other, setOther] = useState("");

  useEffect(() => {
    if (customerFeedback) {
      setQualityOfWork(customerFeedback.qualityOfWork);
      setResults(customerFeedback.results);
      setRecommendTopcoder(customerFeedback.recommendTopcoder);
      setOther(customerFeedback.other);
    }
  }, [customerFeedback]);

  return (
    <div styleName="final-servey">
      <div styleName="header">
        <h4 styleName="title">HOW DID WE DO?</h4>
        <p styleName="subtitle">
          To mark this work as done, please provide feedback on your experience.
        </p>
        <Button
          type={BUTTON_TYPE.ROUNDED}
          styleName="close-btn"
          onClick={onCancel}
        >
          <IconClose />
        </Button>
      </div>

      <hr styleName="divider" />

      <ul styleName="question-list">
        <li>
          <span>How happy are you with the quality of work?</span>
          <Rating value={qualityOfWork} onChange={setQualityOfWork} />
        </li>
        <li>
          <span>How easy was it to get the results you wanted?</span>
          <Rating value={results} onChange={setResults} />
        </li>
        <li>
          <span>How likely are you to recommend Topcoder?</span>
          <Rating value={recommendTopcoder} onChange={setRecommendTopcoder} />
        </li>
      </ul>

      <div styleName="textarea-container">
        <Textarea
          placeholder="What can we do to make your experience better?"
          styleName="textarea"
          rows={8}
          value={other}
          onChange={(event) => setOther(event.target.value)}
        />
      </div>

      <hr styleName="divider" />

      <Button
        styleName="markAsDone-btn"
        size={BUTTON_SIZE.LARGE}
        onClick={() =>
          saveSurvey({
            qualityOfWork,
            results,
            recommendTopcoder,
            other,
          })
        }
      >
        Mark as done
      </Button>
    </div>
  );
};

FinalSurvey.defaultProps = {};

FinalSurvey.propTypes = {
  saveSurvey: PT.func,
  onCancel: PT.func,
  customerFeedback: PT.shape(),
};

export default FinalSurvey;
