import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Photos",
    value: 10,
  },
  {
    id: 2,
    label: "Total Topics",
    value: 4,
  },
  {
    id: 3,
    label: "User with the most uploads",
    value: "Allison Saeng",
  },
  {
    id: 4,
    label: "User with the least uploads",
    value: "Lukas Souza",
  },
];

class Dashboard extends Component {
  state = {
    loading: true,
    focused: null,
    photos: [],
    topics: [],
  };

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));
    if (focused) {
      this.setState({ focused })
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused,
    });

    if (this.state.loading) {
      return <Loading />;
    }

    const panelComponents = (
      this.state.focused
        ? data.filter((e) => this.state.focused === e.id)
        : data
    ).map((e) => {
      return (
        <Panel
          key={e.id}
          label={e.label}
          value={e.value}
          onSelect={(event) => this.selectPanel(e.id)}
        />
      );
    });

    return <main className={dashboardClasses}>{panelComponents}</main>;
  }
}

export default Dashboard;
