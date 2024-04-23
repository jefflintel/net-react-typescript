import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { LoadingComponent } from "../../../app/layout/LoadingComponents";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "../../../app/common/form/CustomTextInput";
import { CustomTextArea } from "../../../app/common/form/CustomTextArea";
import { CustomSelect } from "../../../app/common/form/CustomSelect";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { CustomDateInput } from "../../../app/common/form/CustomDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    // selectedActivity,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Activities require a title"),
    description: Yup.string().required("Descriptions require a title"),
    category: Yup.string().required(),
    date: Yup.string().required("A date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const formSubmitHandler = (activity: Activity) => {
    if (activity.id.length === 0) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) {
    return <LoadingComponent content="...loading activity..." />;
  }

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => formSubmitHandler(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <CustomTextInput placeholder="Title" name="title" />
            <CustomTextArea
              placeholder="Description"
              name="description"
              rows={5}
            />
            <CustomSelect
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <CustomDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d yyyy, h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <CustomTextInput placeholder="City" name="city" />
            <CustomTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
