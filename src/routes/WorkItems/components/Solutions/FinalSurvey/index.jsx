import React, { useState, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import Button from "components/Button";
import { BUTTON_TYPE, BUTTON_SIZE, SURVEY_QUESTIONS } from "constants";
import Textarea from "components/FormElements/FormInputTextArea";
import Rating from "./Rating";
import IconClose from "../../../../../assets/images/icon-close.svg";

import "./styles.module.scss";

const FinalSurvey = ({ saveSurvey, onCancel, customerFeedback }) => {
  const [questions, updateQuestions] = useState(_.cloneDeep(SURVEY_QUESTIONS));

  useEffect(() => {
    if (customerFeedback) {
      if (!Array.isArray(customerFeedback)) {
        console.error("ERROR: invalid customerFeedback data");
      }

      updateQuestions(customerFeedback);
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
          onClick={() => onCancel(questions)}
        >
          <IconClose />
        </Button>
      </div>

      <hr styleName="divider" />

      <ul styleName="question-list">
        {questions.map((q) =>
          typeof q.value === "number" ? (
            <li>
              <span>{q.name}</span>
              <Rating
                value={q.value}
                onChange={(value) => {
                  const index = questions.indexOf(q);
                  questions.splice(index, 1, { ...q, value });
                  updateQuestions([...questions]);
                }}
              />
            </li>
          ) : null
        )}
      </ul>

      {questions.map((q) =>
        typeof q.value === "string" ? (
          <div styleName="textarea-container">
            <Textarea
              placeholder={q.name}
              styleName="textarea"
              rows={8}
              value={q.value}
              onChange={(event) => {
                const index = questions.indexOf(q);
                questions.splice(index, 1, { ...q, value: event.target.value });
                updateQuestions([...questions]);
              }}
            />
          </div>
        ) : null
      )}

      <hr styleName="divider" />

      <Button
        styleName="markAsDone-btn"
        size={BUTTON_SIZE.LARGE}
        onClick={() => saveSurvey(questions)}
        disabled={questions.some((q) => !q.value || /^\s+$/.test(q.value))}
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
