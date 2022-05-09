import React, { useState, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import { BUTTON_SIZE, SURVEY_QUESTIONS } from "constants";
import Textarea from "components/FormElements/FormInputTextArea";
import Rating from "./Rating";
import IconClose from "../../../../../assets/images/icon-close.svg";

import "./styles.module.scss";
import FormField from "../../../../../components/FormElements/FormField";
import { Button } from "../../../../../../src-ts/lib";

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

      <p styleName="subtitle">
        To mark this work as done, please provide feedback on your experience.
      </p>

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
          <FormField
            label="What can we do to make your experience better?"
            styleName="textarea-field"
            labelStyle="label"
          >
            <Textarea
              placeholder="Add here your comments..."
              rows={8}
              value={q.value}
              
              onChange={(event) => {
                const index = questions.indexOf(q);
                questions.splice(index, 1, { ...q, value: event.target.value });
                updateQuestions([...questions]);
              }}
            />
          </FormField>
        ) : null
      )}

      <div className="button-container">
        <Button
          buttonStyle="primary"
          size="xl"
          onClick={() => saveSurvey(questions)}
          disable={questions.some((q) => !q.value || /^\s+$/.test(q.value))}
          label="Mark as done"
        />
      </div>
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
