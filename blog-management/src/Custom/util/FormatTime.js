export const formatTime = (date) => {
    return new Date(Date.parse(date)).toLocaleDateString("vi-VN",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
