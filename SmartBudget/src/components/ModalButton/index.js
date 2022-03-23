import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";
import moment from "moment";

import styles from "./index.module.scss";

const ModalButton = ({
  modalProps,
  modalContent,
  onSubmit,
  extraOnClick,
  form,
  successButtonProps,
  resetForm,
  children,
  initialValues,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const handleSuccess = () => {
    if (form) {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          setVisible(false);
          onSubmit(values);
        })
        .catch(() => {});
    } else {
      onSubmit();
      setVisible(false);
    }
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? moment(initialValues.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
          extraOnClick();
        }}
        {...props}
      >
        {children}
      </Button>
      <Modal
        onCancel={() => setVisible(false)}
        destroyOnClose
        closable={false}
        visible={visible}
        footer={
          <div className={styles.Buttons}>
            <Button className={styles.Button} onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button
              className={styles.Button}
              type="primary"
              onClick={handleSuccess}
              {...successButtonProps}
            >
              Save
            </Button>
          </div>
        }
        {...modalProps}
      >
        {modalContent}
      </Modal>
    </>
  );
};

ModalButton.propTypes = {
  modalProps: PropTypes.instanceOf(Object),
  modalContent: PropTypes.node,
  onSubmit: PropTypes.func,
  extraOnClick: PropTypes.func,
  form: PropTypes.instanceOf(Object),
  successButtonProps: PropTypes.instanceOf(Object),
  resetForm: PropTypes.bool,
  children: PropTypes.node,
  initialValues: PropTypes.instanceOf(Object),
};

ModalButton.defaultProps = {
  modalProps: null,
  modalContent: null,
  onSubmit: () => {},
  extraOnClick: () => {},
  form: null,
  successButtonProps: null,
  resetForm: true,
  children: null,
  initialValues: null,
};

export default ModalButton;
