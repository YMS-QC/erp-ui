import { z } from 'zod';
import dayjs from 'dayjs';

const ProfileSchema = z.object({
    sleepSeconds: z
        .number()
        .min(30, { message: '最小运行间隔30s' })
        .max(30 * 2 * 60, { message: '最大运行间隔1小时' })
        .default(30),
    lookbackDays: z
        .number()
        .min(1, { message: '至少回溯一天' })
        .max(100, { message: '不能超过100天' })
        .default(7),
    dateFrom: z
        .date()
        .min(dayjs().add(-100, 'day').toDate(), { message: '开始日期不能早于100天前' })
        .optional(),
    dateTo: z.date().optional(),
    maxUpdateRows: z.coerce.number().default(1000).optional(),
    transportRowLimit: z.coerce.number().default(10).optional(),
});

export default ProfileSchema;
