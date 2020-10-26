const { timetableService } = rootRequire('/core/services/');

module.exports = {
  findTimetables: async () => {
    const result = await timetableService.findAll();
    return result;
  },
  findTimetableById: async (root, { id }) => {
    const result = await timetableService.findById({ id });
    if (!result)
      return { message: 'NOT_FOUND' };

    return result;
  }
}