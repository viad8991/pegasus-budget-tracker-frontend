import dayjs from "dayjs";

export const formatDate = (isoString: string) => {
    return dayjs(isoString).format('YYYY.MM.DD HH:mm:ss');
}
