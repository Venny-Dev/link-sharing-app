const catchAsync = require("../utils/catchAsync");
const Link = require("../models/linkModel");

exports.updateLinks = catchAsync(async (req, res, next) => {
  const { links } = req.body;

  // Getting all the user links id
  const userLinksId = [];
  const curDbUserLinks = await Link.find({ user: req.user._id }).select(
    "+user"
  );
  if (curDbUserLinks) {
    const ids = curDbUserLinks.map((link) => link._id);
    userLinksId.push(...ids);
  }

  // Get req links id and filter the links to be deleted with the userLinksid
  const linksId = links.map((link) => link.id);
  const linksToBeDeletedIds = userLinksId.filter(
    (link) => !linksId.includes(link.toString())
  );

  // Delete the ids that falls into the link to be deleted array
  await Link.deleteMany({ _id: { $in: linksToBeDeletedIds } });

  // Create or edit links that are coming from req.body
  const results = await Promise.all(
    links.map(async (curlink) => {
      let link = null;

      //  Check link id in the db
      if (curlink.id.toString().length === 24) {
        link = await Link.findById(curlink.id);
      }
      // If there is a link, update it
      if (link) {
        link.link = curlink.link;
        link.name = curlink.name;
        return await link.save();
      }

      // If there is no link, create one
      if (!link) {
        return await Link.create({
          link: curlink.link,
          name: curlink.name,
          user: req.user._id,
        });
      }
    })
  );

  // Remove the user id form the results
  const clientResults = results.map(({ name: value, _id, user, __v, link }) => {
    return {
      value,
      link,
      id: _id, // Set id to the original _id value
    };
  });

  res.status(200).json({
    status: "success",
    data: {
      links: clientResults,
    },
    message: "Link(s) updated successfully",
  });
});

exports.getLinks = catchAsync(async (req, res, next) => {
  const links = await Link.find({ user: req.user._id });

  const clientResults = links.map(({ name: value, _id, user, __v, link }) => {
    return {
      value,
      link,
      id: _id, // Set id to the original _id value
    };
  });

  res.status(200).json({
    status: "success",
    data: {
      links: clientResults,
    },
  });
});
