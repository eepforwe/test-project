export const getData = async (task) => {
  const creator = await task.getCreator();
  const assignedTo = await task.getAssignedTo();
  const status = await task.statusName;
  // const tags = await task.getTags();
  const data = {
    id: task.dataValues.id,
    name: task.dataValues.name,
    description: task.dataValues.description,
    creator: creator.fullName,
    assignedTo: assignedTo.fullName,
    status,
  };
  return data;
};

export const getParams = (query, ctx) => {
  const params = {};

  if (query.category && query.category !== 'All') {
    params[query.category] = Number(ctx.session.userId);
  }

  if (query.status && query.status !== 'All') {
    params.StatusId = Number(query.status);
  }

  return params;
};
