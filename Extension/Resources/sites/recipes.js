// Per-site fixes for sites that offer their own way to turn ads off, which is
// cheaper than fighting the page. Each recipe runs once, at document_start,
// before any page script.
//
// Empty on purpose. The only entry named a site that distributes work without
// licence, and shipping a rule for it invited an argument at review that the
// generic guard makes unnecessary: it stops the same pops without naming anyone.
globalThis.UNDIRECT_RECIPES = [];
