"use client";

import { Fragment, useState, useTransition } from "react";
import { logout, saveCerts, saveProjects, saveSettings, type SaveResult } from "@/app/admin/actions";
import { ProjectCard } from "@/components/ProjectCard";
import { formatStack, isSafeHref, pad2, slugify, uniqueSlug } from "@/lib/format";
import {
  COLORS,
  STATUSES,
  type Bilingual,
  type CaseBlocks,
  type Certification,
  type Locale,
  type Project,
  type SiteContent,
  type Status,
} from "@/lib/types";

const BLOCK_LABELS = ["Problem", "Data", "Approach", "Result"] as const;

const blankProject = (): Project => ({
  slug: "",
  title: "",
  tag: "",
  status: "SHIPPED",
  desc: { en: "", fr: "" },
  stack: "",
  badge: "",
  link: "",
  color: "lilac",
  blocks: { en: ["", "", "", ""], fr: ["", "", "", ""] },
});

const blankCert = (): Certification => ({ name: "", issuer: "", date: "", link: "" });

function download(name: string, data: unknown) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={full ? "field field--full" : "field"}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

type Note = { text: string; bad: boolean };

export function AdminApp({ initial, storageReady }: { initial: SiteContent; storageReady: boolean }) {
  const [projects, setProjects] = useState(initial.projects);
  const [draft, setDraft] = useState<Project>(blankProject);
  const [editing, setEditing] = useState(-1);
  const [error, setError] = useState("");

  const [certs, setCerts] = useState(initial.certs);
  const [certDraft, setCertDraft] = useState<Certification>(blankCert);
  const [certEditing, setCertEditing] = useState(-1);
  const [certError, setCertError] = useState("");

  const [now, setNow] = useState<Bilingual>(initial.settings.now);
  const [nowError, setNowError] = useState("");

  const [note, setNote] = useState<Note>(
    storageReady ? { text: "", bad: false } : { text: "storage not connected · changes won't save", bad: true },
  );
  const [pending, startTransition] = useTransition();

  /** Saves on the server first; local state only changes once the write succeeded. */
  function run(action: () => Promise<SaveResult>, onSaved: () => void, onError: (msg: string) => void) {
    startTransition(async () => {
      let res: SaveResult;
      try {
        res = await action();
      } catch {
        res = { ok: false, error: "couldn't reach the server — try again" };
      }
      if (res.ok) {
        onSaved();
        onError("");
        setNote({ text: `saved · ${new Date(res.savedAt).toLocaleTimeString()}`, bad: false });
      } else {
        onError(res.error);
        setNote({ text: "not saved", bad: true });
      }
    });
  }

  // ---- projects ----

  const commitProjects = (next: Project[], after?: () => void) =>
    run(
      () => saveProjects(next),
      () => {
        setProjects(next);
        after?.();
      },
      setError,
    );

  function patchDraft(patch: Partial<Project>) {
    setDraft((d) => ({ ...d, ...patch }));
    setError("");
  }

  const setDesc = (lang: Locale, value: string) =>
    setDraft((d) => ({ ...d, desc: { ...d.desc, [lang]: value } }));

  const setBlock = (lang: Locale, i: number, value: string) =>
    setDraft((d) => {
      const blocks = [...d.blocks[lang]] as CaseBlocks;
      blocks[i] = value;
      return { ...d, blocks: { ...d.blocks, [lang]: blocks } };
    });

  function resetForm() {
    setDraft(blankProject());
    setEditing(-1);
    setError("");
  }

  function saveProject() {
    const title = draft.title.trim();
    if (!title) return setError("a project needs a name");
    const link = draft.link.trim();
    if (link && !isSafeHref(link)) return setError("links must start with https://, http:// or /");

    const record: Project = { ...draft, title, link };
    const list = projects.slice();
    if (editing >= 0) list[editing] = record;
    else list.unshift({ ...record, slug: uniqueSlug(slugify(title), list) });
    commitProjects(list, resetForm);
  }

  function moveProject(i: number) {
    if (i === 0) return;
    const list = projects.slice();
    [list[i - 1], list[i]] = [list[i], list[i - 1]];
    commitProjects(list, () => {
      if (editing === i) setEditing(i - 1);
      else if (editing === i - 1) setEditing(i);
    });
  }

  function removeProject(i: number) {
    if (!window.confirm(`Delete “${projects[i].title}”? This can't be undone.`)) return;
    commitProjects(
      projects.filter((_, j) => j !== i),
      () => {
        if (editing === i) resetForm();
        else if (editing > i) setEditing(editing - 1);
      },
    );
  }

  // ---- certifications ----

  const commitCerts = (next: Certification[], after?: () => void) =>
    run(
      () => saveCerts(next),
      () => {
        setCerts(next);
        after?.();
      },
      setCertError,
    );

  function patchCert(patch: Partial<Certification>) {
    setCertDraft((d) => ({ ...d, ...patch }));
    setCertError("");
  }

  function resetCert() {
    setCertDraft(blankCert());
    setCertEditing(-1);
    setCertError("");
  }

  function saveCert() {
    const name = certDraft.name.trim();
    if (!name) return setCertError("a certification needs a name");
    const link = certDraft.link.trim();
    if (link && !isSafeHref(link)) return setCertError("links must start with https://, http:// or /");

    const record = { ...certDraft, name, link };
    const list = certs.slice();
    if (certEditing >= 0) list[certEditing] = record;
    else list.push(record);
    commitCerts(list, resetCert);
  }

  function moveCert(i: number) {
    if (i === 0) return;
    const list = certs.slice();
    [list[i - 1], list[i]] = [list[i], list[i - 1]];
    commitCerts(list, () => {
      if (certEditing === i) setCertEditing(i - 1);
      else if (certEditing === i - 1) setCertEditing(i);
    });
  }

  function removeCert(i: number) {
    if (!window.confirm(`Delete “${certs[i].name}”?`)) return;
    commitCerts(
      certs.filter((_, j) => j !== i),
      () => {
        if (certEditing === i) resetCert();
        else if (certEditing > i) setCertEditing(certEditing - 1);
      },
    );
  }

  // ---- currently line ----

  function saveNow() {
    run(() => saveSettings({ now }), () => {}, setNowError);
  }

  // ---- preview ----

  const previewIndex = (editing >= 0 ? editing : projects.length) + 1;

  return (
    <div className="admin">
      <header className="admin-head">
        <div className="admin-brand">
          <a className="wordmark" href="/" target="_blank" rel="noopener" title="Open the site">
            katib<span className="star">*</span>
          </a>
          <span className="admin-label">PROJECT ADMIN</span>
        </div>
        <div className="admin-tools">
          <span className={note.bad ? "saved-note saved-note--bad" : "saved-note"} role="status">
            {pending ? "saving…" : note.text}
          </span>
          <button type="button" className="pill" onClick={() => download("projects.json", projects)}>
            Export projects.json ↓
          </button>
          <button type="button" className="pill" onClick={() => download("certs.json", certs)}>
            Export certs.json ↓
          </button>
          <form action={logout}>
            <button type="submit" className="btn-ghost">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <p className="admin-intro">fill it in on the left, watch the card build itself on the right.</p>

      <div className="admin-grid">
        {/* ---- project form ---- */}
        <section className="panel panel--form" aria-labelledby="project-form-title">
          <h1 id="project-form-title" className="mono-label panel-title">
            {editing >= 0 ? `EDITING — ${projects[editing]?.title ?? ""}` : "NEW PROJECT"}
          </h1>

          <div className="form-grid">
            <Field label="Project name" full>
              <input
                className="input"
                type="text"
                size={1}
                maxLength={80}
                value={draft.title}
                onChange={(e) => patchDraft({ title: e.target.value })}
                placeholder="RivieraInsight"
              />
            </Field>
            <Field label="Category">
              <input
                className="input"
                type="text"
                size={1}
                maxLength={24}
                value={draft.tag}
                onChange={(e) => patchDraft({ tag: e.target.value })}
                placeholder="NLP"
              />
            </Field>
            <Field label="Status">
              <select
                className="input"
                value={draft.status}
                onChange={(e) => patchDraft({ status: e.target.value as Status })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="One-paragraph description" full>
              <textarea
                className="input"
                rows={3}
                maxLength={420}
                value={draft.desc.en}
                onChange={(e) => setDesc("en", e.target.value)}
                placeholder="What it does, for whom, and how."
              />
            </Field>
            <Field label="Description — French" full>
              <textarea
                className="input"
                rows={3}
                maxLength={420}
                value={draft.desc.fr}
                onChange={(e) => setDesc("fr", e.target.value)}
                placeholder="Ce que ça fait, pour qui, et comment."
              />
            </Field>
            <Field label="Stack — comma separated" full>
              <input
                className="input"
                type="text"
                size={1}
                maxLength={200}
                value={draft.stack}
                onChange={(e) => patchDraft({ stack: e.target.value })}
                placeholder="Python, FastAPI, Next.js"
              />
            </Field>
            <Field label="Badge label">
              <input
                className="input"
                type="text"
                size={1}
                maxLength={24}
                value={draft.badge}
                onChange={(e) => patchDraft({ badge: e.target.value })}
                placeholder="AUC 0.95 / LIVE / WIP"
              />
            </Field>
            <Field label="Link (live or GitHub)">
              <input
                className="input"
                type="text"
                inputMode="url"
                size={1}
                maxLength={500}
                value={draft.link}
                onChange={(e) => patchDraft({ link: e.target.value })}
                placeholder="https://…"
              />
            </Field>
          </div>

          <div className="swatch-block">
            <div className="field-label swatch-label">Card colour</div>
            <div className="swatches" role="group" aria-label="Card colour">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`swatch bg-${c}`}
                  title={c}
                  aria-label={c}
                  aria-pressed={draft.color === c}
                  onClick={() => patchDraft({ color: c })}
                />
              ))}
            </div>
          </div>

          <h2 className="mono-label form-section">CASE STUDY</h2>
          <div className="form-grid">
            {BLOCK_LABELS.map((label, i) => (
              <Fragment key={label}>
                {(["en", "fr"] as const).map((lang) => (
                  <Field key={lang} label={`${label} — ${lang.toUpperCase()}`}>
                    <textarea
                      className="input"
                      rows={3}
                      maxLength={900}
                      value={draft.blocks[lang][i]}
                      onChange={(e) => setBlock(lang, i, e.target.value)}
                    />
                  </Field>
                ))}
              </Fragment>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-primary" onClick={saveProject} disabled={pending}>
              {editing >= 0 ? "Save changes" : "Add project ↗"}
            </button>
            <button type="button" className="btn-ghost" onClick={resetForm}>
              Clear form
            </button>
            <span className="form-error" role="alert">
              {error}
            </span>
          </div>
        </section>

        {/* ---- certifications ---- */}
        <section className="panel panel--certs" aria-labelledby="certs-title">
          <h2 id="certs-title" className="mono-label panel-kicker">
            CERTIFICATIONS
          </h2>
          <p className="panel-note">these show up behind the small &quot;Certs&quot; button next to CV.</p>

          <div className="cert-grid">
            <Field label="Certification name">
              <input
                className="input"
                type="text"
                size={1}
                maxLength={140}
                value={certDraft.name}
                onChange={(e) => patchCert({ name: e.target.value })}
                placeholder="Supervised Learning with scikit-learn"
              />
            </Field>
            <Field label="Issuer">
              <input
                className="input"
                type="text"
                size={1}
                maxLength={80}
                value={certDraft.issuer}
                onChange={(e) => patchCert({ issuer: e.target.value })}
                placeholder="DataCamp"
              />
            </Field>
            <Field label="Date">
              <input
                className="input"
                type="text"
                size={1}
                maxLength={40}
                value={certDraft.date}
                onChange={(e) => patchCert({ date: e.target.value })}
                placeholder="March 2026"
              />
            </Field>
            <Field label="Certificate link or image URL — optional" full>
              <input
                className="input"
                type="text"
                inputMode="url"
                size={1}
                maxLength={500}
                value={certDraft.link}
                onChange={(e) => patchCert({ link: e.target.value })}
                placeholder="/certificates/my-cert.png"
              />
            </Field>
          </div>

          <div className="form-actions form-actions--tight">
            <button type="button" className="btn-primary btn-primary--sm" onClick={saveCert} disabled={pending}>
              {certEditing >= 0 ? "Save changes" : "Add certification ↗"}
            </button>
            <button type="button" className="btn-ghost" onClick={resetCert}>
              Clear
            </button>
            <span className="form-error" role="alert">
              {certError}
            </span>
          </div>

          <div className="list list--certs">
            {certs.map((c, i) => (
              <div key={`${c.name}-${i}`} className="row row--cert">
                <div className="row-main">
                  <div className="row-name">{c.name}</div>
                  <div className="row-meta">
                    {[c.issuer, c.date, c.link ? "LINKED" : "NO LINK"].filter(Boolean).join(" · ").toUpperCase()}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-up"
                  title="Move up"
                  aria-label={`Move ${c.name} up`}
                  onClick={() => moveCert(i)}
                  disabled={pending || i === 0}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => {
                    setCertDraft({ ...c });
                    setCertEditing(i);
                    setCertError("");
                  }}
                >
                  Edit
                </button>
                <button type="button" className="btn-delete" onClick={() => removeCert(i)} disabled={pending}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ---- currently line ---- */}
        <section className="panel panel--now" aria-labelledby="now-title">
          <h2 id="now-title" className="mono-label panel-kicker">
            CURRENTLY
          </h2>
          <p className="panel-note">the one-line status in the yellow chip under the hero.</p>
          <div className="form-grid">
            {(["en", "fr"] as const).map((lang) => (
              <Field key={lang} label={lang === "en" ? "English" : "French"}>
                <textarea
                  className="input"
                  rows={3}
                  maxLength={320}
                  value={now[lang]}
                  onChange={(e) => {
                    setNow((n) => ({ ...n, [lang]: e.target.value }));
                    setNowError("");
                  }}
                />
              </Field>
            ))}
          </div>
          <div className="form-actions form-actions--tight">
            <button type="button" className="btn-primary btn-primary--sm" onClick={saveNow} disabled={pending}>
              Save line ↗
            </button>
            <span className="form-error" role="alert">
              {nowError}
            </span>
          </div>
        </section>

        {/* ---- preview + list ---- */}
        <div className="admin-side">
          <div>
            <h2 className="mono-label side-label">LIVE PREVIEW</h2>
            <ProjectCard
              meta={`${pad2(previewIndex)} · ${(draft.tag || "CATEGORY").toUpperCase()} · ${draft.status}`}
              title={draft.title || "Your next project"}
              desc={draft.desc.en || "What it does, for whom, and how — two lines is plenty."}
              stack={formatStack(draft.stack) || "STACK · STACK"}
              badge={draft.badge || "BADGE"}
              color={draft.color}
            />
          </div>

          <div>
            <div className="list-head">
              <h2 className="mono-label side-label">PROJECTS</h2>
              <span className="count-label">{projects.length} in the grid</span>
            </div>
            <div className="list">
              {projects.map((p, i) => (
                <div key={p.slug} className="row row--project">
                  <span className={`chip bg-${p.color}`} aria-hidden="true" />
                  <div className="row-main">
                    <div className="row-name">{p.title}</div>
                    <div className="row-meta">{[p.tag, p.status, p.color].filter(Boolean).join(" · ").toUpperCase()}</div>
                  </div>
                  <button
                    type="button"
                    className="btn-up"
                    title="Move up"
                    aria-label={`Move ${p.title} up`}
                    onClick={() => moveProject(i)}
                    disabled={pending || i === 0}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => {
                      setDraft(structuredClone(p));
                      setEditing(i);
                      setError("");
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn-delete" onClick={() => removeProject(i)} disabled={pending}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
