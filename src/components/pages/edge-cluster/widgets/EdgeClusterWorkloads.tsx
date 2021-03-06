import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { EdgeClusterWorkloads_edgeCluster } from './__generated__/EdgeClusterWorkloads_edgeCluster.graphql';
import { EdgeClusterWorkloads_pod } from './__generated__/EdgeClusterWorkloads_pod.graphql';

export const enNZTranslation = {
  name: 'Name',
  namespace: 'Namespace',
  nodeName: 'Node name',
  hostIP: 'Host IP',
  podIP: 'Pod IP',
};

const styles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  row: {
    height: 40,
  },
}));

const Header = React.memo(() => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell>{t('edgeClusterWorkloads.name')}</TableCell>
        <TableCell>{t('edgeClusterWorkloads.namespace')}</TableCell>
        <TableCell>{t('edgeClusterWorkloads.nodeName')}</TableCell>
        <TableCell>{t('edgeClusterWorkloads.hostIP')}</TableCell>
        <TableCell>{t('edgeClusterWorkloads.podIP')}</TableCell>
      </TableRow>
    </TableHead>
  );
});

interface EdgeClusterWorkloadRowProps {
  pod: EdgeClusterWorkloads_pod;
}

const EdgeClusterWorkloadRow = React.memo<EdgeClusterWorkloadRowProps>(
  ({
    pod: {
      metadata: { name, namespace },
      spec: { nodeName },
      status: { hostIP, podIP },
    },
  }) => {
    const classes = styles();

    return (
      <TableRow className={classes.row}>
        <TableCell>{name}</TableCell>
        <TableCell>{namespace}</TableCell>
        <TableCell>{nodeName}</TableCell>
        <TableCell>{hostIP}</TableCell>
        <TableCell>{podIP}</TableCell>
      </TableRow>
    );
  },
);

const EdgeClusterWorkloadRowRelayed = createFragmentContainer(EdgeClusterWorkloadRow, {
  pod: graphql`
    fragment EdgeClusterWorkloads_pod on EdgeClusterPod {
      metadata {
        name
        namespace
      }
      spec {
        nodeName
      }
      status {
        hostIP
        podIP
      }
    }
  `,
});

interface EdgeClustersNodesProps {
  edgeCluster: EdgeClusterWorkloads_edgeCluster;
}

const EdgeClustersNodes = React.memo<EdgeClustersNodesProps>(({ edgeCluster: { pods } }) => {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Table size="small">
        <Header />
        <TableBody>
          {pods.map((pod) => (
            <EdgeClusterWorkloadRowRelayed key={pod.metadata.id} pod={pod} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});

export default createFragmentContainer(EdgeClustersNodes, {
  edgeCluster: graphql`
    fragment EdgeClusterWorkloads_edgeCluster on EdgeCluster {
      pods {
        metadata {
          id
        }
        ...EdgeClusterWorkloads_pod
      }
    }
  `,
});
