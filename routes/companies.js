const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT code, name 
       FROM companies 
       ORDER BY name`
    );

    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async function (req, res, next) {
  try {
    let code = req.params.code;

    const compResult = await db.query(
      `SELECT code, name, description
       FROM companies
       WHERE code = $1`,
      [code]
    );

    if (compResult.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    }

    const company = compResult.rows[0];

    const invResult = await db.query(
      `SELECT id
       FROM invoices
       WHERE comp_code = $1`,
      [code]
    );

    const invoices = invResult.rows.map(inv => inv.id);
    company.invoices = invoices;

    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

router.post("/:code/industries/:industryCode", async function (req, res, next) {
  try {
    const { code, industryCode } = req.params;

    const industryExists = await db.query(
      `SELECT code FROM industries WHERE code = $1`,
      [industryCode]
    );

    if (industryExists.rows.length === 0) {
      throw new ExpressError(`No such industry: ${industryCode}`, 404);
    }

    const associationExists = await db.query(
      `SELECT * FROM companies_industries 
       WHERE comp_code = $1 AND industry_code = $2`,
      [code, industryCode]
    );

    if (associationExists.rows.length > 0) {
      throw new ExpressError(
        `Industry ${industryCode} already associated with company ${code}`,
        400
      );
    }

    await db.query(
      `INSERT INTO companies_industries (comp_code, industry_code) 
       VALUES ($1, $2)`,
      [code, industryCode]
    );

    return res.json({ message: 'Industry associated with the company' });
  } catch (err) {
    return next(err);
  }
});


router.put("/:code", async function (req, res, next) {
  try {
    let { name, description } = req.body;
    let code = req.params.code;

    const result = await db.query(
      `UPDATE companies
       SET name=$1, description=$2
       WHERE code = $3
       RETURNING code, name, description`,
      [name, description, code]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    } else {
      return res.json({ company: result.rows[0] });
    }
  } catch (err) {
    return next(err);
  }
});

router.delete("/:code", async function (req, res, next) {
  try {
    let code = req.params.code;

    const result = await db.query(
      `DELETE FROM companies
       WHERE code=$1
       RETURNING code`,
      [code]
    );

    if (result.rows.length == 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    } else {
      return res.json({ status: "deleted" });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
