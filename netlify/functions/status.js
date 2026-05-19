export default async () => {
  return Response.json({
    ok: true,
    service: "netlify-functions",
    site: "Eco Pilgua",
    timestamp: new Date().toISOString()
  });
};
