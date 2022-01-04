/**
 * Page Details Form component
 */
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import FormInputTextArea from "components/FormElements/FormInputTextArea";
import PageDivider from "components/PageDivider";
import PageP from "components/PageElements/PageP";
import PageRow from "components/PageElements/PageRow";
import PageListInput from "components/PageListInput";
import ServicePrice from "components/ServicePrice";
import PT from "prop-types";
import React from "react";
import "./styles.module.scss";

const PageDetailsForm = ({
  listInputs,
  setListInputs,
  price,
  serviceType,
  onAdd,
  onRemove,
}) => {
  // get an empty page item
  const emptyPage = () => ({
    pageName: "",
    pageDetails: "",
  });

  // handle list input changes
  const handleListInputChange = (listInputName, index, inputName, value) => {
    setListInputs((listInputs) => {
      let listInput = listInputs[listInputName];
      let newListInput = listInput.map((item, i) => {
        if (i !== index) return item;
        else return { ...item, [inputName]: value };
      });
      return { ...listInputs, [listInputName]: newListInput };
    });
  };

  // add an item to a list input
  const addListInputItem = (listInputName) => {
    setListInputs((listInputs) => {
      let listInput = listInputs[listInputName];
      let newListInput = [...listInput, emptyPage()];
      return { ...listInputs, [listInputName]: newListInput };
    });
    onAdd();
  };

  // remove an item from list input
  const removeListInputItem = (listInputName, index) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setListInputs((listInputs) => {
      let listInput = listInputs[listInputName];
      let newListInput = listInput.filter((item, i) => {
        return i !== index;
      });
      return { ...listInputs, [listInputName]: newListInput };
    });
    onRemove();
  };

  return (
    <div styleName="pageDetailsForm">
      <ServicePrice price={price} serviceType={serviceType} />
      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Describe your pages</PageP>
          <PageP styleName="description">
            <p>
              For each page (or screen) required in your design project, please
              provide:
            </p>
            <ol styleName="list">
              <li>A descriptive page name. i.e. Landing Page</li>
              <li>The primary purpose of the page.</li>
              <li>
                Describe all required content and functional elements. Or,
                reference the content as provided in uploaded resource
                documents. Tip: Use bullets to list and organize these details.
              </li>
            </ol>
            <div role="button" tabIndex="0" styleName="link" target="_blank">
              See an example page description
            </div>
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <PageListInput
            listInput={listInputs.pages}
            name="pages"
            addListInputItem={addListInputItem}
          >
            {listInputs.pages.map((page, index) => (
              <div styleName="page">
                <div styleName="page-header">
                  <div styleName="page-title">Page {index + 1}</div>
                  {index ? (
                    <div
                      role="button"
                      tabIndex="0"
                      styleName="remove-page"
                      onClick={() => removeListInputItem("pages", index)}
                    >
                      Remove Page
                    </div>
                  ) : null}
                </div>
                <FormField label={"Page Name"}>
                  <FormInputText
                    placeholder={"Enter a descriptive name"}
                    value={page.pageName}
                    name="pageName"
                    onChange={(e) =>
                      handleListInputChange(
                        "pages",
                        index,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </FormField>
                <FormField label={"Requirements & Details"}>
                  <FormInputTextArea
                    placeholder={
                      "Enter specific requirements that will be useful for the designers"
                    }
                    value={page.pageDetails}
                    name="pageDetails"
                    onChange={(e) =>
                      handleListInputChange(
                        "pages",
                        index,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </FormField>
              </div>
            ))}
          </PageListInput>
        </div>
      </PageRow>
    </div>
  );
};

PageDetailsForm.defaultProps = {
  price: 0,
  serviceType: "",
};

PageDetailsForm.propTypes = {
  price: PT.string,
  serviceType: PT.string,
  setListInputs: PT.func,
  listInputs: PT.arrayOf(PT.shape()),
  onAdd: PT.func,
  onRemove: PT.func,
};

export default PageDetailsForm;
