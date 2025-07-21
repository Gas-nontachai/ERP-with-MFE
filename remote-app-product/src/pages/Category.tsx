// MUI Replacement for CategoryPage
import {
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  InputAdornment,
  CircularProgress,
  Box,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useState, useMemo } from "react";
import { useCategorys } from "../hooks/useCategorys";
import { useTranslation } from "react-i18next";
import PermissionWrapper from "../components/PermissionWrapper";
import NoPermission from "../components/NoPermission";
import { useHasPermission } from "../utils/permissionUtils";

export default function CategoryPage() {
  const scope = "categorys";
  const {
    categorys,
    isLoading,
    control,
    handleSubmit,
    onSubmit,
    createCategory,
    deleteCategory,
    editingCategoryId,
    startEdit,
    cancelEdit,
    updateCategory,
  } = useCategorys();

  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const { t } = useTranslation();

  const filteredCategorys = useMemo(() => {
    if (!searchTerm.trim()) return categorys;
    const lowerSearch = searchTerm.toLowerCase();
    return categorys.filter(
      (category) =>
        category.name.toLowerCase().includes(lowerSearch) ||
        (category.description?.toLowerCase().includes(lowerSearch) ?? false)
    );
  }, [categorys, searchTerm]);

  const hasViewPermission = useHasPermission(scope, "view");
  const hasActionPermission = useHasPermission(scope, ["update", "delete"]);

  if (!hasViewPermission) return <NoPermission />;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <PermissionWrapper permission={scope} action="create">
        <Button
          variant="outlined"
          onClick={() => setFormVisible((prev) => !prev)}
          sx={{ mb: 2 }}
        >
          {formVisible
            ? t("action.hide_form")
            : editingCategoryId
            ? t("action.show_edit_form")
            : t("action.show_create_form")}
        </Button>
      </PermissionWrapper>

      {formVisible && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <h6> {editingCategoryId ? t("action.edit") : t("action.create")}</h6>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: t("category.name_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("category.name_placeholder")}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("category.description_placeholder")}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Box display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={createCategory.isPending || updateCategory.isPending}
              >
                {editingCategoryId ? t("action.update") : t("action.create")}
              </Button>
              {editingCategoryId && (
                <Button variant="outlined" onClick={cancelEdit}>
                  {t("action.cancel")}
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      )}

      <Paper elevation={2} sx={{ p: 2 }}>
        <TextField
          placeholder={t("category.search_placeholder")}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("category.name")}</TableCell>
                <TableCell>{t("category.description")}</TableCell>
                {hasActionPermission && (
                  <TableCell>{t("action.title")}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategorys.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  {hasActionPermission && (
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <PermissionWrapper permission={scope} action="update">
                          <IconButton
                            onClick={() => {
                              startEdit(category);
                              if (!formVisible) setFormVisible(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </PermissionWrapper>
                        <PermissionWrapper permission={scope} action="delete">
                          <IconButton
                            onClick={() => deleteCategory.mutate(category.id)}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </PermissionWrapper>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isLoading && filteredCategorys.length === 0 && (
          <Box textAlign="center" py={5}>
            <p>
              {searchTerm
                ? t("category.no_categorys_found", { search: searchTerm })
                : t("category.no_categorys_available")}
            </p>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
