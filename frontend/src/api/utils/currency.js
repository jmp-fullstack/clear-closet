const formatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});

export const won = (v) => {
  return formatter.format(v).slice(1) + "원";
};

// export { won }
