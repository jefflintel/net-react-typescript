import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Activity } from "../models/activity";
import { NavBar } from "./NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  const selectActivityHandler = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
  };

  const cancelSelectActivityHandler = () => {
    setSelectedActivity(undefined);
  };

  const openFormHandler = (id?: string) => {
    id ? selectActivityHandler(id) : cancelSelectActivityHandler();
    setEditMode(true);
  };

  const closeFormHandler = () => {
    setEditMode(false);
  };

  const createOrEditHandler = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const deleteActivityHandler = (id: string) => {
    setActivities([...activities.filter((a) => a.id !== id)]);
  };

  return (
    <>
      <NavBar openForm={openFormHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivityHandler}
          cancelSelectActivity={cancelSelectActivityHandler}
          editMode={editMode}
          openForm={openFormHandler}
          closeForm={closeFormHandler}
          createOrEdit={createOrEditHandler}
          deleteActivity={deleteActivityHandler}
        />
      </Container>
    </>
  );
};

export default App;
