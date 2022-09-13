import {MaxSize} from '@huxy/components';

const Index = ({panel, target = 'page-container'}) => <MaxSize panel={panel} target={target} fullIcon={props => <i className="ico-minus" {...props} />} exitIcon={props => <i className="ico-close" {...props} />} />;

export default Index;
