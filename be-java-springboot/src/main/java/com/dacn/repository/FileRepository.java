package com.dacn.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dacn.entity.FileEntity;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Integer> {
    
	@Query("SELECT f FROM FileEntity f WHERE f.is_deleted = FALSE ORDER BY f.ids DESC")
    public Page<FileEntity> getFilesByPageId(Pageable pageable);
	
	@Query("SELECT f.filename FROM FileEntity f WHERE f.id_drive = ?1")
	public String getFileNameByDriveId(String driveId);
    
}
