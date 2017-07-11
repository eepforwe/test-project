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

export const getParams = (query) => {
  const params = {};
  if (query.assignedToId && query.assignedToId !== 'All') {
    params.assignedToId = Number(query.assignedToId);
  }

  if (query.status && query.status !== 'All') {
    params.StatusId = Number(query.status);
  }

  if (query.creatorId) {
    params.creatorId = Number(query.creatorId);
  }

  return params;
};