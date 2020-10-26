const { timetableService } = rootRequire('/core/services/');

module.exports = {
  createTimetable: async (root, params) => {
    const result = await timetableService.create({
      name: params.name,
      description: params.description,
      place: params.place
    });
    return result;
  },
}