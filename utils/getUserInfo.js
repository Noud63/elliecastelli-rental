export const getInfo = async (id) => {
  try {
    const res = await fetch(`/api/getuserinfo/${id}`);
    const data = await res.json();
    console.log(data);
    const { name, email, userName, avatar } = data;
    if (data) {
      return { name, email, userName, avatar };
    }
  } catch (error) {
    console.log(error);
  }
};
