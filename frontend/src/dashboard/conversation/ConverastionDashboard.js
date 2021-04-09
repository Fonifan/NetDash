import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import {
  Flex,
} from '@chakra-ui/react';
import ControlPanel from '../../control/ControlPanel';
import ConversationWidgetGrid from './ConversationWidgetGrid';
import DataService from '../../data/DataService';
import { addVariable, clearVariables } from '../../variable/state/VariableAction';
import { setDatasource, setQueryType } from '../state/DashboardAction';
import SelectFilterModal from '../../filter/presenter/SelectFilterModal';
import FilterService from '../../filter/service/FilterService';
import ConversationMetaDataFactory from './ConversationMetaDataFactory';

const dashboardId = 'conversation';

const useStyles = createUseStyles({
  dashboard: {
    width: '100%',
    flexDirection: 'column',
  },
});

function ConversationDashboard({
  datasources,
  conversation,
  variables,
  clearVariables,
  setDatasource,
  setQueryType,
  addVariable,
}) {
  const classes = useStyles();
  const { datasource } = conversation;
  const [dataMap, setDataMap] = useState({});
  const [isFilterModalOpen, setIsFilterPopoverOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const onCloseModal = () => {
    setIsFilterPopoverOpen(false);
  };
  const onSelectDatasource = (selected) => {
    const ds = { ...selected, tableIdentifier: dashboardId };
    setDatasource({ name: dashboardId, datasource: ds });
    clearVariables();
  };

  const handleOnFilter = (event) => {
    setIsFilterPopoverOpen(true);
    setSelectedFilter(event);
  };

  const useFilter = (event) => {
    addVariable(FilterService.metaToPayload({ filterType: event, filter: selectedFilter }));
  };

  const handleSelectQueryType = (queryType) => {
    setQueryType({ name: dashboardId, type: queryType });
  };

  useEffect(() => {
    if (Object.keys(datasource).length !== 0) {
      const dataService = new DataService(datasource);
      dataService.getBatch(
        ConversationMetaDataFactory.create(
          conversation.queryType,
          conversation.datasource.isBucketizationEnabled,
        ),
        variables,
      ).then(setDataMap);
    }
  }, [variables, conversation]);

  return (
    <Flex className={classes.dashboard}>
      <ControlPanel
        height={125}
        width={500}
        onSetSelectedDatasource={onSelectDatasource}
        data={dataMap.overall}
        datasources={datasources}
        selectedDatasource={datasource}
        onSelectQueryType={handleSelectQueryType}
      />
      <ConversationWidgetGrid
        dataMap={dataMap}
        onFilter={handleOnFilter}
      />
      <SelectFilterModal
        isOpen={isFilterModalOpen}
        onClose={onCloseModal}
        handleSubmit={useFilter}
      />
    </Flex>
  );
}

export default connect(
  (state) => ({
    datasources: state.datasource.datasources,
    variables: state.variable.variables,
    conversation: state.dashboard.conversation,
  }),
  {
    addVariable,
    clearVariables,
    setDatasource,
    setQueryType,
  },
)(ConversationDashboard);
