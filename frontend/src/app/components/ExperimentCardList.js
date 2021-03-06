import React from 'react';

import ExperimentRowCard from './ExperimentRowCard';
import Loading from './Loading';
import LayoutWrapper from './LayoutWrapper';

export default class ExperimentCardList extends React.Component {
  getExperiments() {
    if (!this.props.except) {
      return this.props.experiments;
    }
    return this.props.experiments.filter(experiment => (
      experiment.slug !== this.props.except
    ));
  }

  renderLoading() {
    return (
      <div className="card-list experiments">
        <Loading />
      </div>
    );
  }

  renderExperiments() {
    const { isExperimentEnabled } = this.props;

    return (
      <LayoutWrapper flexModifier="card-list">
        {this.getExperiments().map((experiment, key) => (
          <ExperimentRowCard {...this.props}
                             experiment={experiment}
                             enabled={isExperimentEnabled(experiment)}
                             key={key} />
        ))}
      </LayoutWrapper>
    );
  }

  render() {
    if (this.props.experiments.length === 0) {
      return this.renderLoading();
    }
    return this.renderExperiments();
  }
}
