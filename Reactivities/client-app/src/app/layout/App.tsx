import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { Activity } from "../models/activity";
import { NavBar } from "./NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponents";

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((res) => {
      const activities: Activity[] = [];
      res.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };

  const deleteActivityHandler = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      setSubmitting(false)
    })
    
  };

  if (loading) {
    return <LoadingComponent content="...loading app" inverted={true} />;
  }

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
          submitting={submitting}
        />
      </Container>
    </>
  );
};

export default App;
