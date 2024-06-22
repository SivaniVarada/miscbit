import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import FilterSearch from 'menu-items/DataTable';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import FilterSearchblock from './BlockData';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// assets
import LinkIcon from '@mui/icons-material/Link';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light
}));

// =============================|| TABLER ICONS ||============================= //

const TablerIcons = () => (
  <MainCard title=" A Block Details (AI&ML)">
   <FilterSearchblock block={'A'} department={'Artificial Intelligence and Machine Learning'} />
  </MainCard>
);

export default TablerIcons;