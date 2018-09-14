import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
const filters = {
  timeFormat: function(value, formatString) {
    if (!value) {
      return '---';
    }
    if (typeof value === 'string') {
      return dayjs(parseInt(value)).format(formatString || 'MM月DD日 HH:mm');
    }
    return dayjs(value).format(formatString || 'MM月DD日 HH:mm');
  },
  timeFormat2: function(value, formatString) {
    if (!value) {
      return '---';
    }
    return dayjs(value).format(formatString || 'MM月DD日 HH:mm');
  }
};
export default filters;
