export const getData = async (task) => {
  const creator = await task.getCreator();
  const creatorId = creator.id;
  const assignedTo = await task.getAssignedTo();
  const status = await task.statusName;
  const tags = await task.getTags();
  const comments = await task.getComments({
    order: '"createdAt" DESC',
  });

  const data = {
    id: task.dataValues.id,
    name: task.dataValues.name,
    description: task.dataValues.description,
    creator: creator.fullName,
    creatorId,
    assignedTo: assignedTo.fullName,
    status,
    tags,
    comments,
    getTagsNames: () => tags.map(tag => tag.name),
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

  if (query.tag && query.tag !== 'All') {
    params.TagId = Number(query.tag);
  }

  return params;
};