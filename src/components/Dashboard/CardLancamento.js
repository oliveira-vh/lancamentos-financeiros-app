import React from 'react';
import Typography from '@material-ui/core/Typography';

const CardLancamento = ({title, valor}) => {
  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography component="p" variant="h4">
        R$ {valor}
      </Typography>
    </div>
  );
}

export default CardLancamento